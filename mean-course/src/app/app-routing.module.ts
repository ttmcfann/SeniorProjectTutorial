import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { RecapListComponent } from './recap/recap-list/recap-list.component';
import { RecapCreateComponent } from './recap/recap-create/recap-create.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'recap', component: RecapListComponent},
  { path: 'createRecap', component: RecapCreateComponent},
  { path: 'editRecap/:recapId', component: RecapCreateComponent},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
