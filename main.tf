provider "google" {
  project = "sylvan-repeater-407810"
  region  = "us-east4"
  zone    = "us-east4-c"
  credentials = file("./docguard-service-key.json")
}

resource "google_storage_bucket" "docguard-bucket" {
  name = "docguard-bucket-v1"
  location = "us-east4"
}