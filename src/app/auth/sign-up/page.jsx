"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

const signUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userdata = Object.fromEntries(formData.entries());
    console.log(userdata, "this is from data")

    const {data, error} = await authClient.signUp.email({
      name: userdata.name,
      email: userdata.email,
      password: userdata.password
    })
    if(error){
      alert(`Error sign up ${error.message}...`);
    }if(data){
      alert("signup successfull")
    }
    console.log("show data and errors", data, "errors", error);
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <p>Welcome to the sign up page!</p>
      <Form className="flex w-96 flex-col gap-4 ml-10" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="name"
          type="text"
        >
          <Label>Name</Label>
          <Input placeholder="john@example.com" name="name" />
          <FieldError />
        </TextField>
       
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" name="email" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          type="password"
          // validate={(value) => {
          //   if (value.length < 8) {
          //     return "Password must be at least 8 characters";
          //   }
          //   if (!/[A-Z]/.test(value)) {
          //     return "Password must contain at least one uppercase letter";
          //   }
          //   if (!/[0-9]/.test(value)) {
          //     return "Password must contain at least one number";
          //   }
          //   return null;
          // }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" name="password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      <Link href={"/auth/sign-in"} className="hover:underline text-blue-700">sign in</Link>
      </Form>
    </div>
  );
};

export default signUpPage;
