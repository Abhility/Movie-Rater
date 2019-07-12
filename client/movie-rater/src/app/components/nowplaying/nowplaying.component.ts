import { DataService } from "src/app/services/data.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-nowplaying",
  templateUrl: "./nowplaying.component.html",
  styleUrls: ["./nowplaying.component.css"]
})
export class NowplayingComponent implements OnInit {
  constructor(private dataService: DataService) {}
  @Input("data") data: any[];
  ngOnInit() {
    console.log(this.data);
  }
}
