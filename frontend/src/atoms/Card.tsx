import { Box, Button, Flex, Heading, HStack, HTMLChakraProps, Icon, Spacer, Text, useStyleConfig } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { TooltipPlus } from "./TooltipPlus";

interface CardProps extends HTMLChakraProps<"div"> {
  variant?: string
  title?: string
  subtitle?: string
  tooltip?: React.ReactNode
  isCollapsible?: boolean
  isTransparent?: boolean
  onCollapsed?: (collapsed: boolean) => void
}

export function Card(props: CardProps) {
  const { variant, children, title, isTransparent, isCollapsible, onCollapsed, subtitle, tooltip, ...rest } = props
  const styles = useStyleConfig("Card", { variant, isTransparent })

  const [collapsed, setCollapsed] = useState<boolean | undefined>(isCollapsible);

  const onCollapsedClicked = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed)
    if (onCollapsed)
      onCollapsed(newCollapsed);
  }

  useEffect(() => {
    setCollapsed(isCollapsible)
  }, [isCollapsible])

  if (tooltip && isCollapsible) {
    throw new Error("Collapsible cards cannot have tooltips")
  }

  return (
    <Box __css={styles} {...rest}>
      {title && (
        <Flex direction="column" alignItems="flex-start" gridGap={0} mb={collapsed ? 0 : 2}>
          <HStack w="100%">
            <Heading size="md" fontWeight="bold">{title}</Heading>
            {isCollapsible !== undefined && (
              <>
                <Spacer />
                <Button
                  title={collapsed ? `Show ${title}` : `Hide ${title}`}
                  variant="ghost"
                  size="sm"
                  leftIcon={<Icon as={collapsed ? VscChevronDown : VscChevronUp} />}
                  iconSpacing={0}
                  onClick={onCollapsedClicked}>
                </Button>
              </>
            )}
            {tooltip && (
              <TooltipPlus placement="right" label={tooltip} />
            )}
          </HStack>
          {subtitle && <Text mt={1} fontSize="xs" variant="brandSecondary">{subtitle}</Text>}
        </Flex>
      )}
      {(isCollapsible === undefined || !collapsed) && (
        <>{children}</>
      )}
    </Box>
  )
}
