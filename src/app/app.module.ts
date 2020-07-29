import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ListComponent } from "./components/list/list.component";

@NgModule({
	imports: [BrowserModule, HttpClientModule],
	declarations: [AppComponent, ListComponent],
	bootstrap: [AppComponent],
})
export class AppModule {}
