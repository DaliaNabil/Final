

"use client"

 import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import Image from 'next/image';
import { ShoppingCart, LogOut, User, Menu, X } from "lucide-react"
import { useSession, signOut } from 'next-auth/react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { useEffect, useContext,useState } from "react";
import { cn } from "@/lib/utils";
import { getUserCart } from "@/services/cart.services";
import { CartContext } from "../MySessionProvider/CartContext";

export function Navbar() {
  const { data, status } = useSession(); 
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const[inititialCartCount ,setCartCount] = useState(0)
  const {cartCount} = useContext(CartContext);
   useEffect(function(){
    getUserCart().then(res=>{
      setCartCount(res.numOfCartItems)
    })
   },[])

  const MenuItems = [
    { path: "/products", content: "Products", protected: false },
    { path: "/categories", content: "Categories", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/wishlist", content: "Wishlist", protected: false},
    { path: "/allorders?default=true", content: "Orders", protected: true },
    { path: "/cart", content: "Cart", protected: true },
  ];

  const MenuAuthItems = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  function logout() {
    signOut({
      callbackUrl: '/login'
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">



    <div className="relative">
      <NavigationMenu viewport={false} className="max-w-full justify-between shadow-2xl p-4">
        {/* logo*/}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={'/'}>
                <Image 
                  src={'/images/freshcart-logo.svg'}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/*  */}
        <NavigationMenuList className="hidden lg:flex">
          {MenuItems.map((item) => (
              <React.Fragment key={item.path}>
                {(!item.protected || status === 'authenticated') && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={item.path}>
                      {item.content}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </React.Fragment>
          ))}
        </NavigationMenuList>
    
        {/* قسم أيقونات المستخدم/العربة أو روابط المصادقة */}
        <NavigationMenuList>
          {/* تحقق من حالة المستخدم: authenticated, unauthenticated, أو loading */}
          {status === 'authenticated' ? (
              <>
                {/* أيقونات المستخدم وعربة التسوق */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <User className="h-5 w-5" />
                  <span className='ml-2 text-main'>Account</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[100px] bg-white gap-3 p-4 md:w-[150px]">
                    <li>
                      {/* هنا قمنا بتغيير الكود لإضافة فحص آمن باستخدام ?./ */}
                      <span className='p-2 text-main'>Hello {data?.user?.name}</span>
                    </li>
                    <li className="mt-2"> 
                      <Button onClick={logout} variant="ghost" className="w-full cursor-pointer">
                        <LogOut className="mr-2 text-main h-4 w-4" />
    
                      </Button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/cart" className="cursor-pointer">
                    <Button variant="ghost" size="icon" className="relative ">
                      <ShoppingCart className="h-5 w-5 text-main cursor-pointer" />
                      <span className="absolute text-main -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                      Cart   {cartCount || inititialCartCount}
                      </span>
                      <span className="sr-only">Shopping cart </span>
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          ) : (
            /* روابط تسجيل الدخول والتسجيل للمستخدم غير المصدق */
            MenuAuthItems.map((item) => (
              <NavigationMenuItem key={item.path} className="hidden lg:flex">
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))
          )}
        </NavigationMenuList>
        
        {/* زر قائمة الجوال */}

 
        
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
        </div>
      </NavigationMenu>

      {/* قائمة التنقل للجوال */}
       {isMobileMenuOpen && (
        <div className="lg:hidden absolute w-full border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {MenuItems.map((item) => {
                  const isActive = pathname.startsWith(item.path);
                  return (
                      <Link
                        key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                        "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      {item.content}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
    </header>
  );
}

