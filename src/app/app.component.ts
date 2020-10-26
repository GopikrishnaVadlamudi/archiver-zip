import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, zip } from "rxjs";
declare var require: any;
const archiver = require("archiver");

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public data: any;
  constructor(private _http: HttpClient) {}

  public makeRequests(): void {
    // register format for archiver
    // note: only do it once per Node.js process/application, as duplicate registration will throw an error
    archiver.registerFormat("zip-encrypted", require("archiver-zip-encrypted"));

    // create archive and specify method of encryption and password
    let archive = archiver.create("zip-encrypted", {
      zlib: { level: 8 },
      encryptionMethod: "aes256",
      password: "123"
    });
    archive.append("File contents", { name: "file.name" });
    // ... add contents to archive as usual using archiver
  }
}
