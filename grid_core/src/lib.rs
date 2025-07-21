use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HyperGridMetadata {
    pub column_names: Vec<String>,
    pub number_of_rows: usize,
    pub number_of_columns: usize,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct HyperGridDataset {
    pub metadata: HyperGridMetadata,
    pub data: Vec<HashMap<String, String>>,
}
