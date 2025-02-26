"use client";
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form';
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormFieldType } from './forms/PatientForm';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import calendar from "@/assets/icons/calendar.svg";
import Image from 'next/image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";



interface CustomProps {
    control:Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    className?: string,
    placeholder?: string,
    iconAlt?: string,
    disabled?:boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field:any) => React.ReactNode,
}
const RenderField = ({field, props}: {field:any; props: CustomProps}) => {
    const {fieldType, iconAlt, placeholder,showTimeSelect, dateFormat,className,renderSkeleton} =props;
 switch (fieldType) {
    case FormFieldType.INPUT:
     return (
        <div className='flex rounder-md border border-dark-500 bg-dark-400'>
<FormControl>
    <Input 
    placeholder={placeholder}
    {...field}
    className='shad-input border-0 text-white bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
    />
</FormControl>
        </div>
     )  
     case FormFieldType.PHONE_INPUT:
        return (
            <FormControl>
                <PhoneInput
                    {...field}
                    defaultCountry="EG"
                    international
                    withCountryCallingCode
                    className="bg-black shad-input bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                    placeholder={placeholder} 
                />
            </FormControl>
        )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400 text-black'>
<Image src={calendar} alt={iconAlt || 'icon'} className='icon bg-stone-700 text-stone-200' />
<FormControl>
<DatePicker selected={field.value} onChange={(date) => field.onChange(date)} dateFormat= {dateFormat ?? 'MM/dd/yyyy'} showTimeSelect={showTimeSelect?? false} timeInputLabel="Time:" wrapperClassName='date-picker'
    />
</FormControl>
                </div>
            )
            case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value} >
            <FormControl>
              <SelectTrigger className="shad-select-trigger bg-stone-300  text-white bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
            case FormFieldType.SKELETOn:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
    const {control, fieldType, name, label} =props;
  return (
    <FormField
  control={control}
  name={name}
  render={({ field }) => (
    <FormItem className='flex-1'>
{fieldType !== FormFieldType.CHECKBOX && label && (
    <FormLabel>{label}</FormLabel>
)}
<RenderField  field={field} props={props}/>

<FormMessage className='shad-error'
/>
    </FormItem>
  )} 
   />

  )
}

export default CustomFormField