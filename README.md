# 🪴 Digital Garden

Create a database of your plants with the [Digital Garden](https://digital-garden-andrews.vercel.app/) application.

#### Key Features:
* **Authentication** - Sign up, login, and logout routes with iron-session.
* **Search Plants** - Search over 10,000 species of plants with Perenual API.
* **View Details** - View additional details, plant care data, and scientific names.
* **Create a Collection** - Add and remove plans from your collection.
* **Responsive** - Optimized for desktop and mobile.

---

## 👩🏻‍💻Hey Developers👋
### The Tech Stack:
* **Frontend** - [Next.js](https://nextjs.org/) and React
* **Backend** - Next.js and [Mongoose](https://mongoosejs.com/docs/)
* **Database** - [MongoDB](https://www.mongodb.com/)
* **Auth** - [iron-session](https://www.npmjs.com/package/next-iron-session)
* **API** - [Perenual API](https://perenual.com/docs/api)
* **Deployment** - [Vercel](https://vercel.com/), MongoDB Atlas

### Use This Repo:
1. Clone this repo and initialize from the root directory by running:
   ```zsh
   npm i
   ```

3. Create a Perenual account to get a personal API key.

4. Create an `.env.local` file in the root directory with the following environmental variables:
   ```env
   IRON_PASS=your_iron_session_password
   MONGODB_URI=your_mongodb_URI
   PERENUAL_API_TOKEN=your_perenual_api_token
   ```
5. Start a local server at `https://localhost:3000` with:
   ```zsh
   npm run dev
   ```


### API Routes:
Digital Garden accesses two API endpoints:
* `GET https://perenual.com/api/v2/species-list?key=[YOUR-API-KEY]` for general plant data
* `GET https://perenual.com/api/v2/species/details/[ID]?key=[YOUR-API-KEY]` to get more detailed plant care information
#### Edit Next.js API routes from these files:
* **auth/[action].js** - handles login, logout, and sign up
* **plantDetail.js** - fetches and displays detailed plant info on `plant/[id]
`
* **plants.js** - updates user's plant collection, `POST` and `DELETE`
* **search.js** - fetches general plant info and displays on `/search` and `/collection`

---

## 👨🏼‍🌾 Hey Plant Enthusiasts👋
Learn more about [Perenual](https://perenual.com/) plant data.

### Coming Soon:
* Hardiness zone maps
* Search filtering by plant care needs, hardiness zones, and more
* Opt in for plant care reminders
* Add notes and images to your collected plants

### Feedback:
Let us know how to improve Digital Garden and what features you'd like us to implement [here](#).

### 🪲 Report Bugs:
[Contact us](#) to report a bug.


