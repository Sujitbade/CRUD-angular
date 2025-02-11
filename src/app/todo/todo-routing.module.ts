import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path:'',   redirectTo: 'home', pathMatch: 'full' },
  {path: 'edit', component:EditComponent},
  {path: 'create', component:CreateComponent},
  {path :'todo/edit/:id', component:EditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
