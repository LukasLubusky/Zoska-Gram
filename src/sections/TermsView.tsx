"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

export default function TermsContent() {
  const { theme } = useNextTheme();
  const router = useRouter();
  const BackButton = dynamic(() => import("../components/BackButton"), {
    ssr: false, // Ensures it's client-side only
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 3,
        backgroundColor: theme === "dark" ? "#121212" : "#f4f4f4",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
          border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: 3,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            color: theme === "dark" ? "#ffffff" : "#000000",
            marginBottom: 3,
          }}
        >
          Podmienky používania
        </Typography>

        <Typography
          variant="subtitle1"
          paragraph
          sx={{
            color: theme === "dark" ? "#ffffff" : "#333",
            marginBottom: 3,
          }}
        >
          Tieto podmienky upravujú používanie aplikácie ZoškaSnap. Pred použitím našej aplikácie si prosím dôkladne prečítajte tieto podmienky.
        </Typography>

        <Divider sx={{ marginY: 3 }} />

        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme === "dark" ? "#90caf9" : "#1976d2",
              marginBottom: 1,
            }}
          >
            Používanie aplikácie
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            Užívateľ sa zaväzuje používať aplikáciu v súlade so zákonmi a dobrými mravmi.
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: theme === "dark" ? "#90caf9" : "#1976d2",
              marginBottom: 1,
            }}
          >
            Ochrana údajov
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            Vaše údaje sú spracovávané v súlade s našimi zásadami ochrany osobných údajov.
          </Typography>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: theme === "dark" ? "#9e9e9e" : "#666666",
            fontStyle: "italic",
          }}
        >
          Ďakujeme, že dodržiavate podmienky používania našej aplikácie.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Späť na hlavnú stránku
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <BackButton />
        </Box>
      </Paper>
    </Box>
  );
}
