extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate warp;

use std::sync::{Arc, Mutex};
use warp::Filter;

type Db = Arc<Mutex<Vec<Entry>>>;

#[derive(Debug, Deserialize, Serialize)]
struct Entry {
  id: u64, // TODO: make uuid
  title: String,
  description: String,
  amount: isize, // TODO: make currency
}

// GET /api
fn get_data(db: Db) -> impl warp::Reply {
  warp::reply::json(&*db.lock().unwrap())
}

fn main() {
  // let json_body = warp::body::content_length_limit(1024 * 16).and(warp::body::json());

  // TODO: implement rusqlite
  let db = Arc::new(Mutex::new(Vec::<Entry>::new()));
  let db = warp::any().map(move || db.clone());

  // base API path (prefix)
  let api = warp::path("api");

  // GET /api; does not match with GET /api/something
  let api_index = api.and(warp::path::end());

  // GET /api
  let data = warp::get2().and(api_index).and(db.clone()).map(get_data);

  // View access logs by settings `RUST_LOG=data`
  let routes = data.with(warp::log("data"));

  // Start up server
  warp::serve(routes).run(([127, 0, 0, 1], 3000));
}
