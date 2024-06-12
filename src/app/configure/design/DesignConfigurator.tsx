"use client";
import HandleComponent from "@/components/HandleComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BASE_PRICE } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import { RadioGroup } from "@headlessui/react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import NextImage from "next/image";
import { useState } from "react";
import { Rnd } from "react-rnd";
interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}
const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3">
      <div className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
              `bg-${options.color.tw}`,
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative h-full w-full">
            <NextImage
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1">
        <ScrollArea className="relative flex-1 overflow-auto">
          {/* gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Customize your case
            </h2>
            {/* separator */}
            <div className="my-6 h-px w-full bg-zinc-200" />

            {/* phone back-cover color container */}
            <div className="relative mt-4 flex h-full flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0",
                            {
                              [`border-${color.tw}`]: active || checked,
                            },
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "size-8 rounded-full border border-black border-opacity-10",
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                {/* Phone models */}
                <div className="relative flex w-full flex-col gap-3">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            },
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Pricing */}
                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(value) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                      }}
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                        <div className="mt-3 space-y-4">
                          {selectableOptions.map((option) => (
                            <RadioGroup.Option
                              key={option.value}
                              value={option}
                              className={({ active, checked }) =>
                                cn(
                                  "relative block cursor-pointer rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:justify-between",
                                  {
                                    "border-primary": active || checked,
                                  },
                                )
                              }
                            >
                              <span className="flex items-center">
                                <span className="flex flex-col text-sm">
                                  <RadioGroup.Label
                                    className="font-medium text-gray-900"
                                    as="span"
                                  >
                                    {option.label}
                                  </RadioGroup.Label>

                                  {option.description ? (
                                    <RadioGroup.Description
                                      as="span"
                                      className="text-gray-500"
                                    >
                                      <span className="block sm:inline">
                                        {option.description}
                                      </span>
                                    </RadioGroup.Description>
                                  ) : null}
                                </span>
                              </span>

                              <RadioGroup.Description
                                as="span"
                                className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                              >
                                <span className="font-medium text-gray-900">
                                  {formatPrice(option.price / 100)}
                                </span>
                              </RadioGroup.Description>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </Label>
                    </RadioGroup>
                  ),
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        {/* Total pricing and continue button */}
        <div className="h-16 w-full bg-white px-8">
          {/* visual separator */}
          <div className="h-px w-full bg-zinc-200" />
          
          <div className="flex w-full items-center justify-end">
            <div className="flex w-full items-center gap-6 mt-1">
              <p className="whitespace-nowrap font-medium">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100,
                )}
              </p>

              <Button size="sm" className="w-full">
                Continue
                <ArrowRight className="ml-1.5 inline size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
