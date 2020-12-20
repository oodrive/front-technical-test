import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//  import { SharedModule } from 'app/shared.module';


///////////////////////////////////
////////////COMPONENTS/////////////
///////////////////////////////////
import { ListFileComponent } from './app/views/files/list-file/list-file.component';






const routes: Routes = [

  { path: 'file', component: ListFileComponent },

	{path: '**', redirectTo: 'file', pathMatch: 'full'},

];

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],

})

export class AppRoutingModule { }
