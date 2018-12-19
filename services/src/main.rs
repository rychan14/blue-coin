extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate warp;

use warp::Filter;

#[derive(Debug, Deserialize, Serialize)]
struct Entry {
  id: u64, // make uuid
  title: String,
  description: String,
  amount: isize, // make currency
}

fn main() {
  let json_body = warp::body::content_length_limit(1024 * 16).and(warp::body::json());
  let api = warp::path("api");

  warp::serve(api).run(([127, 0, 0, 1], 3000));
}
