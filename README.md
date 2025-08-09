# 🪴 Digital Garden

Create a database of your plants with the [Digital Garden](https://digital-garden-andrews.vercel.app/) application.

## ⭐️ Key Features
* **Authentication** - Sign up, login, and logout routes with iron-session.
* **Search Plants** - Search over 10,000 species of plants with Perenual API.
* **View Details** - View additional details, plant care data, and scientific names.
* **Create a Collection** - Add and remove plans from your collection.
* **Responsive** - Optimized for desktop and mobile.

## 👨🏼‍🌾 Hey Plant Enthusiasts👋
Learn more about [Perenual](https://perenual.com/) plant data.

We want your feedback! Let us know how to improve Digital Garden and what features you'd like us to implement [here](#).

Features already planned for future updates:
* Hardiness zone maps
* Search filtering by plant care needs, hardiness zones, and more
* Opt in for plant care reminders
* Add notes and images to your collected plants

### 🪲 Report Bugs
[Contact us](#) to report a bug.


---

### 🖥️ The Tech
* **Frontend** - [Next.js](https://nextjs.org/) and React
* **Backend** - Next.js and [Mongoose](https://mongoosejs.com/docs/)
* **Database** - [MongoDB](https://www.mongodb.com/)
* **Auth** - [iron-session](https://www.npmjs.com/package/next-iron-session)
* **API** - [Perenual API](https://perenual.com/docs/api)
* **Deployment** - [Vercel](https://vercel.com/)

## 👩🏻‍💻Hey Developers👋
1. Clone this repo and run `npm i` in the root directory.

2. Create a Perenual account to get a personal API key

4. Create a `.env.local` file in the root directory with the following environmental variables:
```env
IRON_PASS=your_iron_session_password
MONGODB_URI=your_mongodb_URI
PERENUAL_API_TOKEN=your_perenual_api_token
```
5. Start a local server at `https://localhost:3000` with `npm run dev`.

### 🗺️ API Routes
Digital Garden uses 2 API endpoints, one to get general plant data and one to get more detailed plant information.
* **auth/[action].js** - handles login, logout, and sign up
* **plantDetail.js** - fetches and displays detailed plant info on `plant/[id]
`
* **plants.js** - updates user's plant collection, `POST` and `DELETE`
* **search.js** - fetches general plant info and displays on `/search` and `/collection`



[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.


The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

