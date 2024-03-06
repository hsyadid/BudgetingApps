import React from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { Form } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid"

export function DialogWithForm() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <Button className="w-36 flex items-center gap-1" onClick={handleOpen}>
                <p> Start Now</p>
                <ArrowUpRightIcon className="size-4" />


            </Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Form method='post' className="mx-auto bg-white rounded-xl w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Set Up Your Money
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Enter your name and  balance to get Continue.
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Your Name
                        </Typography>
                        <Input label="Nickname" size="lg" name="userName" autoComplete="given-name" required placeholder="e.g Hubins" />
                        <Typography className="-mb-2" variant="h6">
                            Your Balance
                        </Typography>
                        <Input label="Initial Balance" size="lg" type="text" name="initialBalance" required min={1} step={0.500} prefix="Rp" placeholder="e.g. Rp 100.000" />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleOpen} fullWidth type="submit">
                            set up
                        </Button>
                        <input type="hidden" name="_action" value="createAccount" />
                    </CardFooter>
                </Form>
            </Dialog>
        </>
    );
}