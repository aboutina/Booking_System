import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useState } from "react"
import { format, startOfDay } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { useCreateBooking } from "../hooks/useCreateBooking"
import { ReloadIcon } from "@radix-ui/react-icons"

export function BookNow({ roomId }: { roomId: number }) {
    const [checkin, setCheckin] = useState<Date | null>(null)
    const [checkout, setCheckout] = useState<Date | null>(null)
    const useCreateBookingResult = useCreateBooking({ checkin, checkout, roomId });

    // Use handleBooking, isLoading, and error as needed
    const { handleBooking, isLoading, error } = useCreateBookingResult;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="h-7 md:h-9 mt-3">Book Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Now</DialogTitle>
                    <DialogDescription>
                        Set the check in and check out dates.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !checkin && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkin ? format(checkin, "PPP") : <span>Check in</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkin ? checkin : undefined}
                                onSelect={(day) => setCheckin(day ? day : null)}
                                disabled={(date) =>
                                    date < startOfDay(new Date())
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !checkout && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkout ? format(checkout, "PPP") : <span>Check in</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={checkout ? checkout : undefined}
                                onSelect={(day) => setCheckout(day ? day : null)}
                                disabled={(date) =>
                                    date < startOfDay(new Date())
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogFooter>
                    <Button onClick={handleBooking} type="submit">
                        {isLoading ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}