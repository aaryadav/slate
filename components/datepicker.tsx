"use client"

import { useState, useEffect } from 'react';

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "./ui/label"

interface DatePickerProps {
    selectedDate: Date,
    onDateChange: any
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
    console.log('DatePicker selectedDate: ', selectedDate);
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        onDateChange(date);
    }, [date, onDateChange]);

    return (
        <div className="date-picker space-y-3 flex flex-col">
            <Label className="text-black text-base">Due Date</Label>
            <Label
                className={cn(
                    "inline-flex items-center justify-start",
                    !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Label>
            <Card className="w-fit">
                <CardContent className="flex w-fit flex-col space-y-2 p-2">
                    <Select
                        onValueChange={(value) =>
                            setDate(addDays(new Date(), parseInt(value)))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">Tomorrow</SelectItem>
                            <SelectItem value="3">`In `3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                        <Calendar mode="single"
                            selected={selectedDate}
                            onSelect={setDate}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
