"use client";

import Image from "next/image";
import Link from "next/link";
import { set, z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertCircle, CheckCircle2, OctagonAlert } from "lucide-react";


import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const SignInView = () => {
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },

                onError: ({ error }) => {
                    setPending(false);

                    if (error.message.toLowerCase().includes("invalid")) {
                        setError("Invalid email or password");
                    } else {
                        setError(error.message);
                    }
                },
            }
        );
        // form.reset();
    };

    return (
        <div>
            <div className="flex h-full items-center justify-center bg-muted/40 p-4">
                <Card className="w-full max-w-5xl overflow-hidden border-0 shadow-2xl">
                    <CardContent className="grid p-0 md:grid-cols-2">

                        {/* LEFT SIDE */}
                        <div className="flex items-center justify-center p-6 md:p-10">
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full max-w-sm space-y-6"
                            >

                                {/* HEADING */}
                                <div className="space-y-2 text-center">
                                    <h1 className="text-3xl font-bold tracking-tight">
                                        Welcome Back
                                    </h1>

                                    <p className="text-sm text-muted-foreground">
                                        Sign in to continue to Uplift.AI
                                    </p>
                                </div>

                                {/* SUCCESS ALERT */}
                                {success && (
                                    <Alert className="border-green-500 bg-green-50 text-green-700">
                                        <CheckCircle2 className="h-4 w-4" />

                                        <AlertTitle>
                                            Success
                                        </AlertTitle>

                                        <AlertDescription>
                                            Signed in successfully.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* EMAIL */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium"
                                    >
                                        Email
                                    </label>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...form.register("email")}
                                    />

                                    {form.formState.errors.email && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />

                                            {/* <AlertTitle>
                                            Email Error
                                        </AlertTitle> */}

                                            <AlertDescription>
                                                {form.formState.errors.email.message}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* PASSWORD */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium"
                                    >
                                        Password
                                    </label>

                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        {...form.register("password")}
                                    />

                                    {form.formState.errors.password && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />

                                            {/* <AlertTitle>
                                            Password Error
                                        </AlertTitle> */}

                                            <AlertDescription>
                                                {form.formState.errors.password.message}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    {!!error && (
                                        <Alert variant="destructive">
                                            <OctagonAlert className="h-4 w-4" />

                                            {/* <AlertTitle>
                                                Login Failed
                                            </AlertTitle> */}

                                            <AlertDescription>
                                                {error}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                {/* BUTTON */}
                                <Button
                                    disabled={pending}
                                    type="submit"
                                    className="w-full bg-green-700 hover:bg-green-800"
                                >
                                    Sign In
                                </Button>

                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        disabled={pending}
                                        variant="outline"
                                        type="button"
                                        className="w-full">
                                        Google
                                    </Button>
                                    <Button
                                        disabled={pending}
                                        variant="outline"
                                        type="button"
                                        className="w-full">
                                        Github
                                    </Button>
                                </div>

                                {/* FOOTER */}
                                <p className="text-center text-sm text-muted-foreground">
                                    Don&apos;t have an account?{" "}
                                    <span className="cursor-pointer font-medium text-green-700 hover:underline">
                                        <Link href="/sign-up" className="underline underline-offset-4">
                                            Sign Up
                                        </Link>
                                    </span>
                                </p>

                            </form>


                        </div>

                        {/* RIGHT SIDE */}
                        <div className="relative hidden items-center justify-center bg-gradient-to-br from-green-700 to-green-900 md:flex">

                            <div className="absolute inset-0 bg-black/10" />

                            <div className="relative z-10 flex flex-col items-center gap-5">

                                {/* LOGO */}
                                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
                                    <Image
                                        src="/logo.svg"
                                        alt="Uplift.AI Logo"
                                        width={100}
                                        height={100}
                                        priority
                                        className="object-contain"
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="space-y-2 text-center">
                                    <h2 className="text-4xl font-bold text-white">
                                        Uplift.AI
                                    </h2>

                                    <p className="max-w-xs text-sm text-green-100">
                                        Empowering your future with intelligent AI solutions.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </CardContent>
                </Card>

            </div>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
        </div>
    );
};