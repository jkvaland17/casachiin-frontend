import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Input, Avatar, Tooltip, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CallCreateChat,
  CallGetChatHistoryByAppId,
  CallUpdateChatStatus,
} from "@/_ServerActions";
import moment from "moment";
import toast from "react-hot-toast";

interface Message {
  data: {
    _id?: string;
    status?: string;
    messages: {
      _id: string;
      message: string;
      sendType: string;
      time: string;
    }[];
  };
}

const ChatBot = ({ data, chatClose, fetchData }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [chatData, setChatData] = useState<Message>({
    data: { messages: [] },
  });
  console.log("chatData::: ", chatData);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<any[]>([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    chatClose(null);
  };
  useEffect(() => {
    GetChatHistory(data?._id);
  }, [data?._id]);

  const GetChatHistory = async (id: string) => {
    try {
      setIsLoading(true);
      const { data, error } = (await CallGetChatHistoryByAppId(id)) as any;
      if (data?.data) {
        setChatData({
          data: { ...data?.data, messages: data?.data?.messages?.reverse() },
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReopenOrClosedChat = async () => {
    try {
      setIsLoading(true);
      const Data = {
        id: chatData.data?._id,
        status: chatData.data.status === "Closed" ? "Open" : "Closed",
      };
      const { data, error } = (await CallUpdateChatStatus(Data)) as any;
      if (data?.message === "Success") {
        GetChatHistory(data?.data?.application);
        fetchData();
      }
      console.log(data, error);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatData?.data?.status === "Closed") return;
    // const FormData = {
    //   application: data?._id,
    //   message: inputValue,
    // };
    const formData = new FormData() as any;
    formData.append("application", data?._id);
    formData.append("message", inputValue);
    for (let i = 0; i < files.length; i++) {
      formData.append("attachement", files[i]);
    }
    try {
      setIsSend(true);
      const { data, error } = (await CallCreateChat(formData)) as any;
      if (data?.message === "Success") {
        setChatData({
          data: { ...data?.data, messages: data?.data?.messages?.reverse() },
        });
        setIsSend(false);
      }
      if (error) setIsSend(false);
    } catch (error) {
      console.log(error);
    }
    // setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setFiles([]);
  };
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData?.data?.messages]);

  const handleFileChange = (event: any) => {
    const filesArray = Array.from(event.target.files);
    const validFileTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    const validFiles = filesArray.filter((file: any) =>
      validFileTypes.includes(file.type),
    );
    if (validFiles.length < filesArray.length) {
      toast.error("Invalid file types.");
      return;
    }
    setFiles(validFiles);
  };

  const openFileInNewTab = (file: any) => {
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, "_blank");
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return "lucide:image";
    if (fileType.startsWith("video/")) return "lucide:video";
    if (fileType.includes("pdf")) return "lucide:file-text";
    if (fileType.includes("word")) return "lucide:file-type-word";
    if (fileType.includes("excel") || fileType.includes("sheet"))
      return "lucide:file-type-excel";
    return "lucide:file";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-4"
          >
            <Card className="w-[600px] h-96 flex flex-col overflow-hidden shadow-xl">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 bg-primary text-white">
                <div className="flex items-center gap-2">
                  <Avatar
                    size="md"
                    src={data?.photo?.presignedUrl}
                    className="border-2 border-white"
                  />
                  <span className="font-medium">{data?.user?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {chatData?.data?.status && (
                    <Tooltip content="Refresh Chat">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => GetChatHistory(data?._id)}
                        className="text-white"
                      >
                        <Icon icon="lucide:refresh-cw" width={18} />
                      </Button>
                    </Tooltip>
                  )}
                  {chatData?.data?.status && (
                    <Tooltip
                      content={
                        chatData?.data?.status === "Closed"
                          ? "Reopen Chat"
                          : "Mark as Closed"
                      }
                    >
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={handleReopenOrClosedChat}
                        className="text-white"
                      >
                        <Icon
                          icon={
                            chatData?.data?.status === "Closed"
                              ? "lucide:message-circle-plus"
                              : "lucide:message-circle-off"
                          }
                          width={18}
                        />
                      </Button>
                    </Tooltip>
                  )}
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={toggleChat}
                    className="text-white"
                  >
                    <Icon icon="lucide:x" width={18} />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-3 overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center">
                    <Spinner label="Loading..." variant="wave" />
                  </div>
                ) : (
                  <>
                    {chatData?.data?.messages?.map((messageItem: any) => (
                      <motion.div
                        key={messageItem?._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-3 flex ${
                          messageItem?.sendType === "user"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[90%] p-2 rounded-lg ${
                            messageItem?.sendType === "user"
                              ? "bg-default-100"
                              : "bg-primary text-white"
                          }`}
                        >
                          {messageItem?.attachement?.length > 0 && (
                            <div className="mt-2 gap-2 grid grid-cols-2">
                              {messageItem?.attachement.map(
                                (fileUrl: string, index: number) => {
                                  const fileType = fileUrl
                                    .split(".")
                                    .pop()
                                    ?.toLowerCase();
                                  return fileType?.startsWith("jpg") ||
                                    fileType?.startsWith("jpeg") ||
                                    fileType?.startsWith("png") ? (
                                    <div className="p-2 bg-default-50/20 rounded-md cursor-pointer">
                                      <img
                                        key={index}
                                        src={fileUrl}
                                        alt={`Attachment ${index + 1}`}
                                        className="w-10 h-10 rounded object-cover"
                                        onClick={() =>
                                          window.open(fileUrl, "_blank")
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div className="p-2 bg-default-50/20 rounded-md">
                                      <Icon
                                        key={index}
                                        icon={getFileIcon("pdf")}
                                        width={40}
                                        onClick={() =>
                                          window.open(fileUrl, "_blank")
                                        }
                                        className="cursor-pointer"
                                      />
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          )}
                          <p className="text-sm">{messageItem?.message}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {moment(parseInt(messageItem?.time, 10)).format(
                              "MMMM D YYYY, h:mm a",
                            )}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t">
                <div className="max-h-48 gap-2 grid grid-cols-2 overflow-y-auto mb-2">
                  {files?.map((file: any, index: number) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-2 p-2 bg-default-100 rounded-lg">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-10 h-10 rounded object-cover"
                          />
                        ) : (
                          <Icon
                            icon={getFileIcon(file.type)}
                            onClick={() => openFileInNewTab(file)}
                            className="cursor-pointer w-10 h-10"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate">{file.name}</p>
                          <p className="text-xs text-default-400">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => {
                            setFiles(
                              files?.filter((_, idx: number) => index !== idx),
                            );
                          }}
                        >
                          <Icon icon="lucide:x" width={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Input
                  fullWidth
                  placeholder={
                    chatData?.data?.status === "Closed"
                      ? "Chat is closed"
                      : "Type a message..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  isDisabled={chatData?.data?.status === "Closed"}
                  endContent={
                    <>
                      <Button
                        isIconOnly
                        type="button"
                        size="sm"
                        variant="light"
                        color="primary"
                        isDisabled={isLoading}
                        onPress={() => fileInputRef.current?.click()}
                      >
                        <Icon icon="lucide:paperclip" width={18} />
                      </Button>
                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                      />
                      <Button
                        isIconOnly
                        type="submit"
                        size="sm"
                        variant="light"
                        color="primary"
                        isLoading={isSend}
                        isDisabled={chatData?.data?.status === "Closed"}
                      >
                        <Icon icon="lucide:send" width={18} />
                      </Button>
                    </>
                  }
                />
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          isIconOnly
          color="primary"
          size="lg"
          radius="full"
          className="shadow-lg"
          onPress={toggleChat}
        >
          <Icon
            icon={isOpen ? "lucide:x" : "lucide:message-circle"}
            width={24}
          />
        </Button>
      </motion.div>
    </div>
  );
};

export { ChatBot };
