extern crate actix;
extern crate actix_web;

extern crate dotenv;
extern crate env_logger;
extern crate listenfd;

extern crate r2d2;
extern crate r2d2_sqlite;
extern crate rusqlite;

extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;

use std::env;
// use actix::prelude::*;
use actix_web::{
    fs,
    http,
    // middleware,
    server,
    App,
    // AsyncResponder,
    Error,
    // FutureResponse,
    HttpRequest,
    HttpResponse,
    // Json,
    // State,
};
use dotenv::dotenv;
use listenfd::ListenFd;
// use fs::NamedFile;
use r2d2::Pool
use r2d2_sqlite::SqliteConnectionManager;

#[derive(Deserialize, Serialize)]
struct Data {
    temp: f64,
}

// fn index(_req: &HttpRequest) -> Result<HttpResponse, Error> {
//     dotenv().ok();
//     let api_key = env::var("WEATHER_API_KEY").expect("WEATHER_API_KEY not found");
//     let root_template = RootTemplate { api_key: &api_key }.render().unwrap();
//     Ok(HttpResponse::Ok().content_type("text/html").body(root_template))
// }

fn get_api(_req: &HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        // .content_encoding(http::ContentEncoding::Br)
        .content_type("application/json")
        .body(serde_json::to_string(&Data { temp: 10.0 }).unwrap())
}

fn main() {
    ::std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    let host = "127.0.0.1:3000";
    let mut listenfd = ListenFd::from_env();
    let manager = SqliteConnectionManager::file("store.db");
    let pool = Pool::new(manager).unwrap();
    let mut server = server::new(move || {
        vec![
            App::new()
                .prefix("api")
                .resource("/data", |r| r.method(http::Method::GET).f(get_api)),
            // App::new()
            //     .resource("/", |r| r.f(index))
            //     .handler("/build", fs::StaticFiles::new("client/build").expect("fail to handle static build files"))
        ]
    });

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)
    } else {
        server
            .bind(host)
            .expect(&format!("could not bind to {}", host))
    };

    println!("Starting http server: {}", host);
    server.run();
}
