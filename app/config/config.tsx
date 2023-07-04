const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@words.lk9nbwx.mongodb.net/?retryWrites=true&w=majority`;

export const config = {
    mongo: {
        url: MONGO_URL
    }
}