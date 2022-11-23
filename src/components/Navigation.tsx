import { Stack /*, Text */ } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
//import { useAuth } from "./Auth";
import { DarkModeToggle } from "./DarkModeToggle";
import { ScrollArea } from "./ScrollArea";
import { SidebarLink } from "./SidebarLink";

export function Navigation() {
  //const { user } = useAuth();
  return (
    <ScrollArea pt="5" pb="6">
      <Stack pb="6">
        <SidebarLink icon={<FaHome />} href="/">
          Inicio
        </SidebarLink>
      </Stack>

      {/*<Stack pb="6">
        {user && (
          <>
            <Text fontWeight="medium">Rudimentos Algebraicos</Text>
            <SidebarLink href={"contentSelect?type=4"}>
              Factorización
            </SidebarLink>
            <SidebarLink href={"contentSelect?type=5"}>
              Fracción algebraica
            </SidebarLink>

            <Text fontWeight="medium">Potencias</Text>
            <SidebarLink href={"contentSelect?type=6"}>
              Potencias racionales
            </SidebarLink>
            <SidebarLink href={"contentSelect?type=7"}>
              Raiz n-ésima
            </SidebarLink>
            <SidebarLink href={"contentSelect?type=8"}>
              Racionalización
            </SidebarLink>

            <Text fontWeight="medium">Ecuaciones</Text>
            <SidebarLink href={"contentSelect?type=9"}>Ecuaciones</SidebarLink>
            <SidebarLink href={"contentSelect?type=10"}>
              Sistema de ecuaciones
            </SidebarLink>

            <Text fontWeight="medium">Geometría</Text>
            <SidebarLink href={"contentSelect?type=11"}>Triángulos</SidebarLink>
            <SidebarLink href={"contentSelect?type=12"}>
              Teorema de Thales
            </SidebarLink>
            <SidebarLink href={"contentSelect?type=13"}>
              Teorema de Pitágoras
            </SidebarLink>
          </>
        )}
        </Stack>*/}

      <Stack alignItems="center">
        <DarkModeToggle />
      </Stack>
    </ScrollArea>
  );
}
