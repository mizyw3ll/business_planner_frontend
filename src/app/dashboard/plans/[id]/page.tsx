// // src/app/dashboard/plans/[id]/page.tsx

// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { useBusinessPlanGet } from "@/src/features/business-plans/api/useBusinessPlanGet";
// import PlanBlocks from "@/src/features/business-plans/components/PlanBlocks";
// import { Skeleton, Button, Box, Typography } from "@mui/material";
// import Link from "next/link";
// import AddBlockButton from "@/src/features/business-plans/components/BlockForm";
// import ButtonBase from "@mui/material/ButtonBase";
// import Divider from "@mui/material/Divider";
// import { ArrowLeft, Edit } from "lucide-react";
// import { APP_ROUTES } from "@/src/lib/appRoutes";
// import DeletePlanButton from "@/src/features/business-plans/components/BusinessPlanActions";

// function CollapsibleDescription({ text }: { text: string }) {
//     const [expanded, setExpanded] = useState(false);

//     return (
//         <Box sx={{ mt: 2 }}>
//             <Typography
//                 variant="body1"
//                 color="text.secondary"
//                 sx={{
//                     fontSize: "1.25rem",
//                     wordBreak: "break-word",
//                     ...(expanded
//                         ? {}
//                         : {
//                             display: "-webkit-box",
//                             WebkitLineClamp: 3,
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                         }),
//                 }}
//             >
//                 {text}
//             </Typography>
//             <ButtonBase
//                 onClick={() => setExpanded((prev) => !prev)}
//                 sx={{
//                     mt: 2,
//                     width: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     fontSize: "0.75rem",
//                     color: "primary.main",
//                     "&:hover": {
//                         color: "primary.dark",
//                     },
//                 }}
//             >
//                 <Divider sx={{ flex: 1, borderColor: "divider" }} />
//                 <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
//                     {expanded ? "Скрыть" : "Раскрыть полностью"}
//                 </Typography>
//                 <Divider sx={{ flex: 1, borderColor: "divider" }} />
//             </ButtonBase>
//         </Box>
//     );
// }

// export default function BusinessPlanDetailPage() {
//     const { id } = useParams();
//     const planId = Number(id);
//     const { data: plan, isLoading, error } = useBusinessPlanGet(planId);

//     if (isLoading) {
//         return (
//             <Box sx={{ maxWidth: 1200, mx: "auto", py: 10 }}>
//                 <Skeleton variant="rectangular" height={48} width={256} sx={{ mb: 4, borderRadius: 1 }} />
//                 <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
//             </Box>
//         );
//     }

//     if (error || !plan) {
//         return (
//             <Box sx={{ maxWidth: 1200, mx: "auto", py: 10, textAlign: "center" }}>
//                 <Typography variant="h4" color="error" sx={{ fontWeight: 600, mb: 4 }}>
//                     План не найден
//                 </Typography>
//                 <Button component={Link} href="/dashboard" variant="contained">
//                     Назад к списку
//                 </Button>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ maxWidth: 1200, mx: "auto", py: 10 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 8 }}>
//                 <Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//                         <Button variant="outlined" size="small" component={Link} href="/dashboard/plans" startIcon={<ArrowLeft size={18} />}>
//                             К списку планов
//                         </Button>
//                     </Box>
//                     <Typography
//                         variant="h3"
//                         sx={{
//                             fontWeight: 600,
//                             wordBreak: "break-word",
//                             mb: 2,
//                         }}
//                     >
//                         {plan?.title}
//                     </Typography>
//                     <AddBlockButton planId={planId} />
//                     {plan?.description && <CollapsibleDescription text={plan.description} />}
//                 </Box>
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                     <Button variant="outlined" component={Link} href={APP_ROUTES.dashboard.plans.edit(planId)} startIcon={<Edit size={18} />}>
//                         Редактировать
//                     </Button>
//                     <DeletePlanButton planId={planId} size="default" />
//                 </Box>
//             </Box>

//             <PlanBlocks blocks={plan?.blocks || []} planId={planId} />
//         </Box>
//     );
// }


// src/app/dashboard/plans/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useBusinessPlanGet } from "@/src/features/business-plans/api/useBusinessPlanGet";
import PlanBlocks from "@/src/features/business-plans/components/PlanBlocks";
import { Skeleton, Button, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import AddBlockButton from "@/src/features/business-plans/components/BlockForm";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import { ArrowLeft, Edit } from "lucide-react";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import BusinessPlanActions from "@/src/features/business-plans/components/BusinessPlanActions"; // ← обновил импорт

function CollapsibleDescription({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Box sx={{ mt: 2 }}>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    fontSize: "1.25rem",
                    wordBreak: "break-word",
                    ...(expanded
                        ? {}
                        : {
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }),
                }}
            >
                {text}
            </Typography>
            <ButtonBase
                onClick={() => setExpanded((prev) => !prev)}
                sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "0.75rem",
                    color: "primary.main",
                    "&:hover": {
                        color: "primary.dark",
                    },
                }}
            >
                <Divider sx={{ flex: 1, borderColor: "divider" }} />
                <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                    {expanded ? "Скрыть" : "Раскрыть полностью"}
                </Typography>
                <Divider sx={{ flex: 1, borderColor: "divider" }} />
            </ButtonBase>
        </Box>
    );
}

export default function BusinessPlanDetailPage() {
    const { id } = useParams();
    const planId = Number(id);
    const { data: plan, isLoading, error } = useBusinessPlanGet(planId);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); // < 900px

    if (isLoading) { /* ... скелетон */ }
    if (error || !plan) { /* ... ошибка */ }

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 10 }}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between", 
                alignItems: "flex-start", 
                gap: 3,
                mb: 8 
            }}>
                <Box sx={{ width: { xs: "100%", md: "auto" } }}>
                    {/* Кнопка "Назад" */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            component={Link}
                            href="/dashboard/plans"
                            startIcon={<ArrowLeft size={18} />}
                            sx={{
                                minWidth: { xs: "auto", md: "unset" },
                                px: { xs: 1.5, md: 2 },
                            }}
                        >
                            {isMobile ? null : "К списку планов"}
                        </Button>
                    </Box>

                    <Typography variant="h3" sx={{ fontWeight: 600, wordBreak: "break-word", mb: 2 }}>
                        {plan?.title}
                    </Typography>

                    <AddBlockButton planId={planId} />
                    {plan?.description && <CollapsibleDescription text={plan.description} />}
                </Box>

                {/* Кнопки действий — справа или под заголовком на мобильных */}
                <Box sx={{ 
                    display: "flex", 
                    gap: 1, 
                    ml: { md: "auto" },
                    width: { xs: "100%", md: "auto" },
                    justifyContent: { xs: "flex-start", md: "flex-end" }
                }}>
                    {/* Редактировать */}
                    <Button
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        component={Link}
                        href={APP_ROUTES.dashboard.plans.edit(planId)}
                        startIcon={<Edit size={18} />}
                        sx={{
                            minWidth: { xs: "44px", md: "auto" },
                            px: { xs: 1.5, md: 2 },
                        }}
                    >
                        {isMobile ? null : "Редактировать"}
                    </Button>

                    {/* Удалить */}
                    <BusinessPlanActions
                        planId={planId}
                        iconOnly={isMobile}
                        iconSize={isMobile ? "small" : "medium"}
                    />
                </Box>
            </Box>

            <PlanBlocks blocks={plan?.blocks || []} planId={planId} />
        </Box>
    );
}