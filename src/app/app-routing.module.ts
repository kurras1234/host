import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'student',
    loadChildren: ()=> {
      return loadRemoteModule({
        remoteEntry: 'http://localhost:4300/remoteEntry.js',
        type:'module',
        exposedModule:"./featureModule"
      }).then(m => m.FeatureModule).catch(error => console.log(error));
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
