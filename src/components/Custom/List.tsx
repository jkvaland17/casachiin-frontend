import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@heroui/react";
import TextEditor from "@/components/TextEditor";
import { Tooltip } from "@heroui/tooltip";
import React, { useCallback, useState } from "react";
import pdfIcon from "@/assets/img/icons/common/pdf-icon.png";
import Image from "next/image";

export default function List() {
  const [showInfo, setShoeInfo] = useState(false);
  const [textEditor, setTextEditor] = useState();
  const [data] = useState([
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=12",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=11",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=10",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. sadsad sad ads das dsd sadsa dsads s dsad sd as d",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=9",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=8",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=7",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=6",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=1",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Ayush Mavani",
      icon: "https://i.pravatar.cc/150?img=2",
      title: "Lorem Ipsum is simply dummy",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ]);
  const [page, setPage] = useState(1);
  const [totalCount] = useState<number>(data?.length);

  const rowsPerPage = 7;
  const pages = Math.ceil(totalCount / rowsPerPage);

  const renderCell = useCallback((user: any, columnKey: any) => {
    switch (columnKey) {
      case "no":
        return (
          <p className="text-bold text-sm capitalize flex items-center">
            <Checkbox />

            <span className="material-symbols-rounded text-gray-400 cursor-pointer hover:text-yellow-300">
              grade
            </span>
          </p>
        );
      case "name":
        return (
          <User
            avatarProps={{
              radius: "full",
              size: "lg",
              src: user?.icon,
              className: "border-3 border-gray-300",
            }}
            classNames={{
              description: "text-default-500",
            }}
            name={<span className="text-nowrap">{user?.name}</span>}
          ></User>
        );
      case "desc":
        return (
          <div
            onClick={() => setShoeInfo(!showInfo)}
            className="cursor-pointer"
          >
            <span className="font-bold text-sm capitalize truncate ">
              {user?.title}
            </span>
            <br />
            <span className="text-sm">{user?.desc}</span>
          </div>
        );
      case "time":
        return <p className="text-bold text-sm capitalize">1:00 PM</p>;

      case "action":
        return (
          <div className="flex justify-start">
            <span className="material-symbols-outlined cursor-pointer text-lg text-default-400 active:opacity-50">
              mail
            </span>
            <span className="material-symbols-outlined cursor-pointer text-lg text-default-400 active:opacity-50">
              delete
            </span>
            <span className="material-symbols-outlined cursor-pointer text-lg text-default-400 active:opacity-50">
              print
            </span>
          </div>
        );
    }
  }, []);
  return (
    <div>
      {showInfo ? (
        <Card className="rounded-md">
          <CardHeader
            style={{
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <Button isIconOnly onClick={() => setShoeInfo(!showInfo)}>
                  <span className="material-symbols-rounded text-medium">
                    arrow_back
                  </span>
                </Button>
                <span>Interview Mail</span>
              </div>
              <div className="flex gap-2">
                <Tooltip content="Archive">
                  <Button isIconOnly>
                    <span className="material-symbols-rounded text-medium">
                      mail
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip content="Bookmark">
                  <Button isIconOnly>
                    <span className="material-symbols-rounded text-medium">
                      bookmark
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip content="Spam">
                  <Button isIconOnly>
                    <span className="material-symbols-rounded text-medium">
                      info
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip content="Delete">
                  <Button isIconOnly>
                    <span className="material-symbols-rounded text-medium text-red-500">
                      delete
                    </span>
                  </Button>
                </Tooltip>
                <Tooltip content="Settings">
                  <Button isIconOnly>
                    <span className="material-symbols-rounded text-medium">
                      settings
                    </span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <div className="flex justify-between items-center">
              <User
                avatarProps={{
                  radius: "full",
                  size: "lg",
                  src: "https://i.pravatar.cc/150?img=12",
                  className: "border-3 border-gray-300",
                }}
                classNames={{
                  description: "text-default-500",
                }}
                name={<span className="text-nowrap">Ayush Mavani</span>}
              >
                {/* <span className="text-nowrap">Ayush Mavani</span> */}
              </User>
              <div className="flex gap-2 items-center">
                <span className="text-gray-500">
                  Friday 07 Apr (4 hours ago)
                </span>
                <Button isIconOnly>
                  <span className="material-symbols-rounded text-medium">
                    grade
                  </span>
                </Button>
                <Button isIconOnly>
                  <span className="material-symbols-rounded text-medium">
                    print
                  </span>
                </Button>

                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly>
                      <span className="material-symbols-rounded text-medium">
                        more_vert
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">Replay</DropdownItem>
                    <DropdownItem key="copy">Forward</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <Divider className="mt-2" />
            <p className="mt-4 text-gray-500">
              Dear Customer,
              <br />
              <br /> We regret to notify you that an unauthorized attempt was
              made to access your account. Our system discovered suspicious
              activity, and we acted right away to safeguard your personal data.
              Please change your login information by clicking the following
              link in order to safeguard your account: Please be aware that your
              account may be temporarily suspended if no action is taken within
              24 hours. We urge you to take immediate action to prevent any
              inconvenience. We sincerely apologize for any inconvenience this
              may cause and thank you for your immediate attention to this
              matter.
              <br />
              <br /> Yours faithfully,
              <br /> Account Security Team
            </p>
            <Divider className="mt-4" />
            <p className="mt-4 text-gray-500 flex gap-2 items-center">
              <span className="material-symbols-rounded">attach_file</span>
              Attachments
            </p>
            <div className="bg-slate-200 text-gray-500  grid grid-cols-4 gap-2 items-center rounded-md p-4 w-[150px] mt-2 ">
              <Image
                src={pdfIcon}
                className="h-6 object-contain col-span-1"
                alt="No-Pdf"
              />
              <p className="col-span-2 text-sm">
                Test.pdf
                <div>200KB</div>
              </p>
              <span className="material-symbols-rounded col-span-1">
                download
              </span>
            </div>
            <div className="mt-2">
              <TextEditor
                value={textEditor}
                setvalue={setTextEditor}
                disabled={false}
              />
            </div>
            <Divider className="mt-2" />
            <div className="flex justify-end mt-2">
              <Button
                color="primary"
                endContent={
                  <span className="material-symbols-rounded">send</span>
                }
              >
                Send
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Table
          isStriped
          className="rounded-sm"
          aria-label="Example table with custom cells"
          topContent={
            <div className="flex justify-between">
              <ButtonGroup>
                <Button
                  startContent={
                    <span className="material-symbols-outlined">error</span>
                  }
                >
                  Important
                </Button>
                <Button
                  startContent={
                    <span className="material-symbols-outlined">
                      wifi_tethering
                    </span>
                  }
                >
                  Social
                </Button>
                <Button
                  startContent={
                    <span className="material-symbols-outlined">
                      monitoring
                    </span>
                  }
                >
                  Promotion
                </Button>
              </ButtonGroup>
              <div className="flex gap-2">
                <Input
                  placeholder="Search..."
                  className="rounded"
                  type="search"
                  startContent={
                    <span className="material-symbols-outlined">search</span>
                  }
                />
                <Button isIconOnly variant="bordered">
                  <span className="material-symbols-outlined text-sm">
                    refresh
                  </span>
                </Button>
                <Button isIconOnly variant="bordered">
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </Button>

                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" isIconOnly>
                      <span className="material-symbols-outlined text-sm">
                        more_vert
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">All</DropdownItem>
                    <DropdownItem key="copy">None</DropdownItem>
                    <DropdownItem key="edit">Read</DropdownItem>
                    <DropdownItem key="edit">Unread</DropdownItem>
                    <DropdownItem key="edit">Starred</DropdownItem>
                    <DropdownItem key="edit">Unstarred</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          }
          bottomContent={
            data?.length > 0 && pages > 0 ? (
              <div className="flex w-full justify-end">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn key="no">
              <Checkbox />
              No
            </TableColumn>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="desc">Desc</TableColumn>
            <TableColumn key="time">Time</TableColumn>
            <TableColumn key="action">Action</TableColumn>
          </TableHeader>
          <TableBody
            items={data
              .map((item: any, i: number) => ({ srNo: i + 1, ...item }))
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)}
            emptyContent={"No data available!"}
            loadingContent={<Spinner />}
            className="table-fixed"
          >
            {(item: any) => (
              <TableRow key={item}>
                {(columnKey) => (
                  <TableCell className="truncate max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
