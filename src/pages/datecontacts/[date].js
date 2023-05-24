import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import DateContacts from "../../components/datecontacts";

const DateContactsPage = () => {
  const router = useRouter();
  const { date } = router.query;
  const { data: session, status } = useSession();

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts/contacts`, fetcher);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (error) return <div>Error loading contacts.</div>;
  if (!contacts) return <div>Loading contacts...</div>;

  const userContacts = contacts.filter(
    (contact) => contact.dateOfImport === date
  );

  return (
    <DateContacts date={date} contacts={userContacts} />
  );
};

export default DateContactsPage;
