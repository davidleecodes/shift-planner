"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "./DateRangePicker";

const codeEnum = ["v", "h", "e"] as const;
const formSchema = z.object({
  offDate: z.object({
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

    code: z.enum(codeEnum, {
      errorMap: () => ({ message: "Code is Required." }),
    }),
  }),
});

export function OffDayForm({
  addFunc,
}: {
  addFunc: (offDay: {
    code: "v" | "h" | "e";
    dateRange: { from?: Date ; to?: Date  };
  }) => {};
}) {
  // 1. Define your form.
  const formA = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offDate: {
        // code: "",
      },
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(event);
    // event.preventDefault();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    addFunc(values.offDate);
    formA.reset();
    console.log(values.offDate);
  }

  return (
    <Form {...formA}>
      {/* <form onSubmit={formA.handleSubmit(onSubmit)} className="space-y-8"> */}
      {/* <DatePickerWithRange form={formA} name={`offDate.dateRange`} /> */}

      <div className="flex gap-2">
        <FormField
          control={formA.control}
          name={`offDate.dateRange`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>date</FormLabel>
              <DatePickerWithRange form={formA} name={`offDate.dateRange`} />
            </FormItem>
          )}
        />
        <FormField
          control={formA.control}
          name={`offDate.code`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>code</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select code" />
                  </SelectTrigger>
                  <SelectContent>
                    {codeEnum.map((key) => (
                      <SelectItem key={key} value={key} className="select-item">
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
          <Button onClick={formA.handleSubmit(onSubmit)}>add</Button>
        </FormItem>
      </div>

      {/* <Button type="submit">add</Button> */}

      {/* </form> */}
    </Form>
  );
}
