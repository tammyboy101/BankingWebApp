const { CosmosClient } = require("@azure/cosmos");

// Load environment variables (ensure these are set in Azure Function App Settings)
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    try {
        // Ensure the request has a valid body with email & password
        if (!req.body || !req.body.email || !req.body.password) {
            context.res = {
                status: 400,
                body: "Missing email or password."
            };
            return;
        }

        const { email, password } = req.body;

        // Reference Cosmos DB database and container
        const database = client.database("BankingDB");
        const container = database.container("Users");

        // Check if user already exists
        const { resources: existingUsers } = await container.items
            .query(`SELECT * FROM c WHERE c.email = "${email}"`)
            .fetchAll();

        if (existingUsers.length > 0) {
            context.res = {
                status: 400,
                body: "User already exists."
            };
            return;
        }

        // Insert new user into Cosmos DB
        const newUser = { id: email, email, password };
        await container.items.create(newUser);

        context.res = {
            status: 201,
            body: "User signed up successfully!"
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};

