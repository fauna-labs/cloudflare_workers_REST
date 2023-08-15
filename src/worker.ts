import { Client, fql} from "fauna";
export interface Env {
 //hello c:
}
interface InventoryData {
  item: string;
  quantity: number;
  price: number;
}

const client = new Client({
	secret: FAUNA_SECRET, 
	//THIS DOES NOT WORK AT THE MOMENT
	//I COULD NOT ACCESS YOUR CLOUDFLARE ACCOUNT TO FIX IT
	//I DUNNO OTHER WAYS, YOU DO IT PLS D':
  });

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    switch (request.method) {
      case 'GET':
        const getUrl = new URL(request.url);
        const getId = getUrl.searchParams.get('id');
        
        try {
          if (getId) {
            const response = await client.query(fql`Inventory.byId(${getId})`);
            return new Response(JSON.stringify(response));
          } else {
            const response = await client.query(fql`Inventory.all()`);
            return new Response(JSON.stringify(response));
          }
        } catch (error) {
          console.error(error);
          return new Response('Error fetching data', { status: 500 });
        }

      case 'POST':
        try {
          const requestPostData = await request.json() as InventoryData; // Parse the incoming JSON data
          const item = requestPostData.item;
          const quantity = requestPostData.quantity;
          const price = requestPostData.price;

          const response = await client.query(fql`Inventory.create({item: ${item}, quantity: ${quantity}, price: ${price}})`);
          return new Response(`A new item has been added to the inventory: ${JSON.stringify(response)}`);
        } catch (error) {
          console.error(error);
          return new Response('Error adding item', { status: 500 });
        }

      case 'PUT':
        const putUrl = new URL(request.url);
        const putId = putUrl.searchParams.get('id');

        if (putId) {
          try {
            const requestPutData = await request.json() as InventoryData;
            const item = requestPutData.item;
            const quantity = requestPutData.quantity;
            const price = requestPutData.price;

            const response = await client.query(fql`
              let itemToUpdate = Inventory.byId(${putId});
              itemToUpdate.update({
                  item: ${item},
                  quantity: ${quantity},
                  price: ${price}
              })`
            );

            return new Response(`Updated item with ID ${putId} in the inventory: ${JSON.stringify(response)}`);
          } catch (error) {
            console.error(error);
            return new Response(`Error updating item`, { status: 500 });
          }
        } else {
          return new Response('Missing ID to update item', { status: 400 });
        }

      case 'DELETE':
        const deleteUrl = new URL(request.url);
        const deleteId = deleteUrl.searchParams.get('id');

        if (deleteId) {
          try {
            await client.query(fql`
              let toDelete = Inventory.byId(${deleteId});
              toDelete.delete()`
            );
            return new Response(`You have deleted the item with ID: ${deleteId} from the inventory`);
          } catch (error) {
            console.error(error);
            return new Response(`Error deleting item`, { status: 500 });
          }
        } else {
          return new Response('Missing ID to delete item', { status: 400 });
        }

      default:
        return new Response('This is the default response!', { status: 404 });
    }
  },
};
