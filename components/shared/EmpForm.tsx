"use client";
import { createPortal } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/actions/user.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "./DateRangePicker";
import { OffDayForm } from "./OffDayForm";
import { useRef } from "react";

const shiftEnum = ["normal", "always", "never"] as const;
const shiftDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const codeEnum = ["v", "h", "e"] as const;
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  shiftDays: z.object({
    Mon: z.enum(shiftEnum),
    Tue: z.enum(shiftEnum),
    Wed: z.enum(shiftEnum),
    Thu: z.enum(shiftEnum),
    Fri: z.enum(shiftEnum),
    Sat: z.enum(shiftEnum),
    Sun: z.enum(shiftEnum),
  }),
  offDates: z.array(
    z.object({
      from: z.date(),
      to: z.date(),
      code: z.enum(codeEnum),
    })
  ),
});

export function EmpForm({ employee }) {
  // console.log(employee);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      username: employee.username || "",
      shiftDays: {
        Mon: employee.shiftDays?.Mon || "normal",
        Tue: employee.shiftDays?.Tue || "normal",
        Wed: employee.shiftDays?.Wed || "normal",
        Thu: employee.shiftDays?.Thu || "normal",
        Fri: employee.shiftDays?.Fri || "normal",
        Sat: employee.shiftDays?.Sat || "normal",
        Sun: employee.shiftDays?.Sun || "normal",
      },
      offDates: [],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: "offDates",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>, event) {
    // event.preventDefault();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    updateUser(employee._id, values);
  }
  const portalRef = useRef(null);
  // const portalRef = (element) => {
  //   if (element !== null) {
  //     createPortal(<span>Hello!</span>, element);
  //   }
  // };
  const sidebarContentEl = document.getElementById("sidebar-content");
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>last name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {shiftDays.map((day) => (
            <FormField
              key={day}
              control={form.control}
              name={`shiftDays.${day}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{day}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="select-field">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {shiftEnum.map((key) => (
                          <SelectItem
                            key={key}
                            value={key}
                            className="select-item"
                          >
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {fields.map((field, index) => (
            <div key={field.id}>
              <DatePickerWithRange form={form} name={`offDates.${index}`} />
              <FormField
                control={form.control}
                name={`offDates.${index}.code`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>code</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="select-field">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {codeEnum.map((key) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className="select-item"
                            >
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          ))}
          <div ref={portalRef} id="sidebar-content" />
          <OffDayForm addFunc={append} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
