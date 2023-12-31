import React, { use, useState } from "react";
import { useRouter } from "next/router";
import AddressClients from "../components/stepformcomponents/addressclients";
import EndearingTerm from "../components/stepformcomponents/endearingterm";
import MessageInput from "../components/stepformcomponents/messageinput";
import WelcomeInput from "../components/stepformcomponents/welcomeinput";
import WithoutName from "../components/stepformcomponents/withoutname";
import Sidebarheader from "../components/sidebarheader";
import SelectCard from "../components/stepformcomponents/selectcard";
import { useSession, getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function StepForm() {
  
  const { data: session, status } = useSession();
  console.log(session)
  const router = useRouter();

  const [page, setPage] = useState(0);
  const formList = [
    "welcomeInput",
    "addressClients",
    "endearingTerm",
    "withoutName",
    "selectCard",
    "messageInput",
  ];
  const formLength = formList.length;

  const [values, setValues] = useState({
    welcomeInput: "",
    addressClients: "",
    endearingTerm: "",
    withoutName: "",
    selectCard: "",
    messageInput: "",
  });

  const handlePrev = () => {
    setPage(page == 0 ? 0 : page - 1);
  };

  const handleNext = () => {
    setPage((page) => (page === formLength - 1 ? 0 : page + 1));
  };

  const handleForm = () => {
    switch (page) {
      case 0:
        return (
          <WelcomeInput
            handleBack={handlePrev}
            handleNext={handleNext}
            formValues={values}
            onChange={onChange}
          />
        );
      case 1:
        return (
          <AddressClients
            handleBack={handlePrev}
            handleNext={handleNext}
            formValues={values}
            onChange={onChange}
          />
        );
      case 2:
        return (
          <EndearingTerm
            handleBack={handlePrev}
            handleNext={handleNext}
            formValues={values}
            onChange={onChange}
          />
        );
      case 3:
        return (
          <WithoutName
            handleBack={handlePrev}
            handleNext={handleNext}
            formValues={values}
            onChange={onChange}
          />
        );
        case 4:
        return (
          <SelectCard
            handleBack={handlePrev}
            handleNext={handleNext}
            formValues={values}
            onChange={onChange}
          />
        );
      case 5:
        return (
          <MessageInput
            handleBack={handlePrev}
            handleNext={handleNext}
            formValues={values}
            onChange={onChange}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/userpreferences/userpreferences?userId=${session?.user?.id}`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (response.ok) {
      // Handle successful update
      router.push("/cardtemplates/templates");}

    return response;
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <div className=" relative">{handleForm()}</div>
    </div>
  );
}
