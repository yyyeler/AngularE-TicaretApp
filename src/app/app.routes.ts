import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/addproduct/addproduct';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './pages/login/login.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
    {path:'products',component: ProductComponent, canActivate:[LoginGuard]},
    {path:'addproduct',component: AddProductComponent, canActivate:[LoginGuard]},
    {path:'',redirectTo : 'products',pathMatch:'full'},
    {path:'products/category/:categoryId', component: ProductComponent, canActivate:[LoginGuard]},
    {path:'cart', component: CartComponent, canActivate:[LoginGuard]},
    {path:'order', component: OrderComponent, canActivate:[LoginGuard]},
    {path:'login',component: LoginComponent},
    {path:'signin',component: SigninComponent},
];
