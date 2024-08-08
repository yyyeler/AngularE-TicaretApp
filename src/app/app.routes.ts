import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/addproduct/addproduct';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './pages/login/login.guard';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
    {path:'products',component: ProductComponent, canActivate:[LoginGuard]},
    {path:'products-add-2',component: AddProductComponent, canActivate:[LoginGuard]},
    {path:'',redirectTo : 'products',pathMatch:'full'},
    {path:'products/category/:categoryId', component: ProductComponent, canActivate:[LoginGuard]},
    {path:'login',component: LoginComponent},
    {path:'signin',component: SigninComponent},
];
