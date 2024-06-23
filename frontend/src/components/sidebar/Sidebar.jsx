import React,{useState} from "react";
import logo from "../../pages/Home/logo.svg"
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PlusCircleIcon,
  InboxIcon,
  PowerIcon,
  UsersIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Header from "../header/Header";
 
export default function Sidebar() {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <>
    <Card className="h-[calc(100vh)] w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 flex items-center bg-stone-400" >
        <Typography> 
          <img src={logo} alt="" />
        </Typography>
          <p className="font-[grifter] text-[--light-blue]">INVENTRA</p>
      </div>
      <List>
        <Accordion>
          <ListItem className="p-0" >
            <AccordionHeader className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
        </Accordion>
        <Accordion>
          <ListItem className="p-0" >
            <AccordionHeader  className="border-b-0 p-3">
              <ListItemPrefix>
                <PlusCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Add Product
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Invoice
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UsersIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
      </List>
    </Card>
    </>
  );
}