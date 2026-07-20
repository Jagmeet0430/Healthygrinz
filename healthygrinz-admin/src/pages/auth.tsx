import { Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const resetSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm your password"),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function LoginPage() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@healthygrinz.com", password: "admin123" },
  });

  function submit() {
    notify({ title: "Welcome back", description: "Signed in to HealthyGrinz Admin demo." });
    void navigate({ to: "/" });
  }

  return (
    <AuthCard title="Admin Login" description="Access clinic operations, AI tools, reports, and billing.">
      <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
        <label className="grid gap-2 text-sm font-bold">
          Email
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" {...form.register("email")} />
          </div>
          {form.formState.errors.email ? <Error>{form.formState.errors.email.message}</Error> : null}
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Password
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" type="password" {...form.register("password")} />
          </div>
          {form.formState.errors.password ? <Error>{form.formState.errors.password.message}</Error> : null}
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="rounded border-border" defaultChecked />
            Remember me
          </label>
          <Link className="font-bold text-primary" to="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <Button className="w-full" size="lg" type="submit">
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}

export function ForgotPasswordPage() {
  const { notify } = useToast();
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  function submit(values: z.infer<typeof emailSchema>) {
    notify({ title: "Reset link prepared", description: `Demo reset instructions for ${values.email}.` });
  }

  return (
    <AuthCard title="Forgot Password" description="Enter your admin email to receive reset instructions.">
      <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
        <label className="grid gap-2 text-sm font-bold">
          Email
          <Input {...form.register("email")} placeholder="admin@healthygrinz.com" />
          {form.formState.errors.email ? <Error>{form.formState.errors.email.message}</Error> : null}
        </label>
        <Button type="submit">Send reset instructions</Button>
        <Link className="text-center text-sm font-bold text-primary" to="/login">
          Back to login
        </Link>
      </form>
    </AuthCard>
  );
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  function submit() {
    notify({ title: "Password updated", description: "Demo credentials have been refreshed." });
    void navigate({ to: "/login" });
  }

  return (
    <AuthCard title="Reset Password" description="Create a new secure admin password.">
      <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
        <label className="grid gap-2 text-sm font-bold">
          New password
          <Input type="password" {...form.register("password")} />
          {form.formState.errors.password ? <Error>{form.formState.errors.password.message}</Error> : null}
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Confirm password
          <Input type="password" {...form.register("confirmPassword")} />
          {form.formState.errors.confirmPassword ? <Error>{form.formState.errors.confirmPassword.message}</Error> : null}
        </label>
        <Button type="submit">Reset password</Button>
      </form>
    </AuthCard>
  );
}

function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-black">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function Error({ children }: { children?: React.ReactNode }) {
  return <span className="text-xs font-semibold text-destructive">{children}</span>;
}
