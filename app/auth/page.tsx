"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/services/auth/useLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login } = useLogin();

  const handleLogin = () => {
    const data = {
      alias: "admin",
      password: "admin",
    };
    login(data);
  };

  return (
    <div className="flex h-screen min-w-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Inicio de sesión
          </CardTitle>
          <CardDescription className="text-gray-600">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Usuario
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="pl-10 bg-white border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700">
                Contraseña
              </Label>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                Olvidasete tu Contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pl-10 bg-white border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-500 hover:text-gray-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white"
            onClick={handleLogin}
          >
            Ingresar
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gradient-to-r italic text-gray-500">
                programezone@gmail.com
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
