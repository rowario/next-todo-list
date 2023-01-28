import { Button } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { FC } from "react";

const LoginScreen: FC = () => {
    const { data: session } = useSession();
    if (session) {
        return null;
    }
    return (
        <>
            {" "}
            Not signed in <br />{" "}
            <Button onClick={() => signIn("discord")}>
                Войти при помощи Discord
            </Button>{" "}
        </>
    );
};

export default LoginScreen;
