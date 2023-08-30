import { Client, fql } from "fauna";
import { Router, withParams } from 'itty-router';

export interface Env {
  FAUNA_SECRET: string;
}

const router = Router();

// GET: fetch all inventories
router.get('/inventory', async (request: Request, dbClient) => {
	try {
		const response = await dbClient.query(fql`Inventory.all()`);
		return new Response(JSON.stringify(response.data));
	} catch (error) {
		console.error(error);
		return new Response('Error fetching data', { status: 500 });
	}
});

// GET: fetch a single inventory item by ID
router.get('/inventory/:id', withParams as any, async (request, dbClient) => {
	const { id } = request.params;
  try {
    if (id) {
      const response = await dbClient.query(fql`Inventory.byId(${id})`);
      return new Response(JSON.stringify(response));
    }
		return new Response('Missing ID to fetch item', { status: 400 });
  } catch (error) {
    console.error(error);
    return new Response('Error fetching data', { status: 500 });
  }
});

// POST: Create a new inventory item
router.post('/inventory', async (request: Request, dbClient) => {
  try {
    const requestData = await request.json() as any;
    const response = await dbClient.query(fql`Inventory.create(${requestData})`);
    return new Response(`A new item has been added to the inventory: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error(error);
    return new Response('Error adding item', { status: 500 });
  }
});

// PUT: Update an existing inventory item by ID
router.put('/inventory/:id', withParams as any, async (request, dbClient) => {
  const { id } = request.params;
  if (!id) return new Response('Missing ID to update item', { status: 403 });

  try {
    const requestData = await request.json() as any;
    const response = await dbClient.query(fql`
			let item = Inventory.byId(${id})
			item!.update(${requestData})
		`);
    return new Response(`Updated item with ID ${id} in the inventory: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error(error);
    return new Response('Error updating item', { status: 500 });
  }
});

// DELETE: Delete an inventory item by ID
router.delete('/inventory/:id', withParams as any, async (request, dbClient) => {
  const { id: deleteId } = request.params;

  if (!deleteId) return new Response('Missing ID to delete item', { status: 400 });

  try {
    await dbClient.query(fql`
			let item = Inventory.byId(${deleteId})
			item!.delete()
		`);
    return new Response(`You have deleted the item with ID: ${deleteId} from the inventory`);
  } catch (error) {
    console.error(error);
    return new Response('Error deleting item', { status: 500 });
  }
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const dbClient = new Client({
			secret: env.FAUNA_SECRET,
		});
    return router.handle(request, dbClient);
  }
};
