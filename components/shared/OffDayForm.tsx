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
    from: z.date(),
    to: z.date(),
    code: z.enum(codeEnum),
  }),
});

export function OffDayForm({ addFunc }) {
  // 1. Define your form.
  const formA = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offDate: {
        from: "",
        to: "",
        code: "",
      },
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>, event) {
    console.log(event);
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
      <div>
        <DatePickerWithRange form={formA} name={`offDate`} />
        <FormField
          control={formA.control}
          name={`offDate.code`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>code</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select size" />
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
      </div>

      {/* <Button type="submit">add</Button> */}
      <Button onClick={formA.handleSubmit(onSubmit)}>add</Button>
      {/* </form> */}
    </Form>
  );
}
