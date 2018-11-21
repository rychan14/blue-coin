extern crate actix;
extern crate actix_web;
extern crate listenfd;
extern crate env_logger;
extern crate dotenv;
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

#[derive(Deserialize, Serialize)]
struct Data {
    temp: f64
}

fn get_api(_req: &HttpRequest) -> HttpResponse {
    HttpResponse::Ok()
        // .content_encoding(http::ContentEncoding::Br)
        .content_type("application/json")
        .body(serde_json::to_string(&Data {
            temp: 10.0
        }).unwrap())
}

fn main() {
    ::std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    let host = "127.0.0.1:3000";
    let mut listenfd = ListenFd::from_env();
    let mut server = server::new(move || {
        vec![ App::new()
                .prefix("api")
                .resource("/data", |r| r.method(http::Method::GET).f(get_api))
        ]
    });
    
    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)
    } else {
        server.bind(host)
            .expect(&format!("could not bind to {}", host))
            
    };

    println!("Starting http server: {}", host);
    server.run();
}