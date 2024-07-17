"use client";
import { SquareDashedBottom, PackageOpen } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";

const shiftEnum = ["morning", "evening", "none", "leave"] as const;

const formSchema = z.object({
  dayCodes: z.array(
    z.object({
      name: z.string(),
      shift: z.enum(shiftEnum),
      notes: z.string(),
    })
  ),
});

export function CodeForm({ codes }) {
  // console.log(employee);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dayCodes: codes || [],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: "dayCodes",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>, event) {
    // event.preventDefault();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // updateUser(employee._id, values);
  }
  const portalRef = useRef(null);

  return (
    <div>
      <Form {...form}>
        <div className="flex flex-col  gap-6">
          <Card className="flex justify-center grow min-h-52">
            <CardContent className="  flex justify-center p-6 w-full">
              {fields.length === 0 && (
                <div className="self-center">
                  <PackageOpen size={64} absoluteStrokeWidth={true} />
                  <p className=" text-center">no data</p>
                </div>
              )}
              {fields.length !== 0 && (
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex  gap-2 group">
                      <FormField
                        control={form.control}
                        name={`dayCodes.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex-none w-24 ">
                            <FormLabel className=" hidden group-first:block">
                              name
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`dayCodes.${index}.shift`}
                        render={({ field }) => (
                          <FormItem className="flex-none w-24">
                            <FormLabel className=" hidden group-first:block">
                              shift
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="select-field">
                                  <SelectValue placeholder="Select shift" />
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
                      <FormField
                        control={form.control}
                        name={`dayCodes.${index}.notes`}
                        render={({ field }) => (
                          <FormItem className="grow">
                            <FormLabel className=" hidden group-first:block">
                              notes
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormItem>
                        <FormLabel className="hidden group-first:block invisible  ">
                          notes
                        </FormLabel>
                        <FormControl>
                          <Button onClick={() => remove(index)}>Delete</Button>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                      {/* <div className="pt-7">
                        <Button onClick={() => remove(index)}>Delete</Button>
                      </div> */}
                    </div>
                  ))}
                  <div ref={portalRef} id="sidebar-content" />
                </form>
              )}
            </CardContent>
          </Card>
          <CodeAddForm addFunc={append} />
          <Button type="submit">Save </Button>
        </div>
      </Form>
    </div>
  );
}

const codeFormSchema = z.object({
  code: z.object({
    name: z.string().min(2, {
      message: "required",
    }),
    shift: z.enum(shiftEnum),
    notes: z.string(),
  }),
});

function CodeAddForm({ addFunc }) {
  // 1. Define your form.
  const formA = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: {
        name: "",
        shift: shiftEnum[0],
        notes: "",
      },
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof codeFormSchema>, event) {
    console.log(event);
    // event.preventDefault();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    addFunc(values.code);
    formA.reset();
    console.log(values.code);
  }

  return (
    <Form {...formA}>
      <div className="flex  gap-2  ">
        <FormField
          control={formA.control}
          name={`code.name`}
          render={({ field }) => (
            <FormItem className="flex-none w-24">
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formA.control}
          name={`code.shift`}
          render={({ field }) => (
            <FormItem className="flex-none w-24">
              <FormLabel>shift</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select cize" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftEnum.map((key) => (
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

        <FormField
          control={formA.control}
          name={`code.notes`}
          render={({ field }) => (
            <FormItem className="grow ">
              <FormLabel>notes</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel className="invisible ">notes</FormLabel>
          <FormControl>
            <div>
              <Button onClick={formA.handleSubmit(onSubmit)}>add</Button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>

        {/* <div className="pt-7">
          <Button onClick={formA.handleSubmit(onSubmit)}>add</Button>
        </div> */}
      </div>
    </Form>
  );
}
