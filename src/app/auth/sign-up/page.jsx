"use client";
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const signUpPage = () => {
    const [isVisible, setIsVisible] = useState(false);


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

       <TextField className="w-full max-w-[280px]" name="password">
      <Label>Password</Label>
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          type={isVisible ? "text" : "password"}
          
        />
        <InputGroup.Suffix className="pr-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
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
