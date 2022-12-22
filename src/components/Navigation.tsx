import { Stack , Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
//import { useAuth } from "./Auth";
import { DarkModeToggle } from "./DarkModeToggle";
import { ScrollArea } from "./ScrollArea";
import { SidebarLink } from "./SidebarLink";
import { useAuth } from "../components/Auth";


export function Navigation() {
  const { user } = useAuth();


  return (
    <ScrollArea pt="5" pb="6">
      <Stack pb="6">
        <SidebarLink icon={<FaHome />} href="/">
          Inicio
        </SidebarLink>
      </Stack>

      {<Stack pb="6">
        {user && (
          <>
            <Text fontWeight="medium">Rudimentos Algebraicos</Text>
            <SidebarLink href={"?pid=0"}>
              Fracción algebraica
            </SidebarLink>
            <SidebarLink href={"?pid=1"}>
              Suma de fracciones
            </SidebarLink>

            <Text fontWeight="medium">Potencias</Text>
            <SidebarLink href={"?pid=2"}>
              Notación científica
            </SidebarLink>
            <SidebarLink href={"?pid=3"}>
              Evaluar expresión
            </SidebarLink>
            <SidebarLink href={"?pid=4"}>
              Reducción de expresión
            </SidebarLink>
            <SidebarLink href={"?pid=5"}>
             Racionalización
            </SidebarLink>
            <SidebarLink href={"?pid=6"}>
             m3
            </SidebarLink>
            <SidebarLink href={"?pid=7"}>
             m4
            </SidebarLink>
            <SidebarLink href={"?pid=8"}>
             m5
            </SidebarLink>
          </>
        )}
        </Stack>}

      <Stack alignItems="center">
        <DarkModeToggle />
      </Stack>
    </ScrollArea>
  );
}
