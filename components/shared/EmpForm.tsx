"use client";
import { createPortal } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Field } from "react-hook-form";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquareDashedBottom, PackageOpen } from "lucide-react";

const shiftEnum = ["normal", "always", "never"] as const;
const shiftDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const codeEnum = ["v", "h", "e"] as const;
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 cha.",
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
      dateRange: z
        .object(
          {
            from: z.date(),
            to: z.date().optional(),
          },
          { required_error: "Date is required." }
        )
        .refine((dateRange) => {
          return !!dateRange.to;
        }, "End Date is required."),
      code: z.enum(codeEnum),
    })
  ),
});

export function EmpForm({ employee }: { employee: UserParams }) {
  // console.log(employee);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      username: employee.username || "",
      shiftDays: {
        Mon: employee.shiftDays?.Mon || shiftEnum[0],
        Tue: employee.shiftDays?.Tue || shiftEnum[0],
        Wed: employee.shiftDays?.Wed || shiftEnum[0],
        Thu: employee.shiftDays?.Thu || shiftEnum[0],
        Fri: employee.shiftDays?.Fri || shiftEnum[0],
        Sat: employee.shiftDays?.Sat || shiftEnum[0],
        Sun: employee.shiftDays?.Sun || shiftEnum[0],
      },
      offDates: [],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: "offDates",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // event.preventDefault();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    updateUser(employee._id, values);
  }
  const portalRef = useRef(null);
  const shiftDaysArray = [
    "shiftDays.Mon",
    "shiftDays.Tue",
    "shiftDays.Wed",
    "shiftDays.Thu",
    "shiftDays.Fri",
    "shiftDays.Sat",
    "shiftDays.Sun",
  ] as const;

  // const shiftDaysArray = shiftEnum.map((day) => `shiftDays.${day}`) as const;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>first name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>last name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name" {...field} />
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
                    <Input placeholder="user name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {shiftDaysArray.map((day) => {
              return (
                <FormField
                  key={day}
                  control={form.control}
                  name={day}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{day.split(".")[1]}</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
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
              );
            })}
          </div>

          <OffDayForm addFunc={append} />

          <Card className="flex justify-center grow min-h-52">
            <CardContent className="  flex justify-center p-6 w-full">
              {fields.length === 0 && (
                <div className="self-center">
                  <PackageOpen size={64} absoluteStrokeWidth={true} />
                  <p className=" text-center">no data</p>
                </div>
              )}
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`offDates.${index}.dateRange`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>date</FormLabel>
                        <DatePickerWithRange
                          form={form}
                          name={`offDates.${index}.dateRange`}
                        />
                      </FormItem>
                    )}
                  />
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
                              <SelectValue placeholder="Select code" />
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
                  <FormItem>
                    <FormLabel className="block my-1 invisible">code</FormLabel>
                    <Button type="button" onClick={() => remove(index)}>
                      Delete
                    </Button>
                  </FormItem>
                </div>
              ))}
            </CardContent>
          </Card>
          <div ref={portalRef} id="sidebar-content" />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
