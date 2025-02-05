"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Paper, Typography, Button, Box, Divider } from "@mui/material";
import { motion } from "framer-motion";

export default function GDPRContent() {
  const { theme } = useTheme();
  const router = useRouter();

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 800 }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: theme === "dark" ? "#ffffff" : "#000000", mb: 3 }}
          >
            GDPR - Ochrana osobných údajov
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            paragraph
            sx={{ color: theme === "dark" ? "#bbbbbb" : "#333333", mb: 4 }}
          >
            Vaša ochrana súkromia je pre nás veľmi dôležitá. V tomto dokumente sa dozviete, ako spracúvame a chránime vaše osobné údaje v súlade s nariadením GDPR.
          </Typography>

          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: theme === "dark" ? "#90caf9" : "#1976d2" }}
            >
              Zodpovednosť
            </Typography>
            <Typography variant="body1" sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>
              Všetky osobné údaje, ktoré nám poskytnete, budú použité iba na účely, na ktoré boli poskytnuté.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: theme === "dark" ? "#90caf9" : "#1976d2" }}
            >
              Práva užívateľov
            </Typography>
            <Typography variant="body1" sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>
              Máte právo na prístup k svojim údajom, ich úpravu alebo vymazanie. Kontaktujte nás na{" "}
              <Box
                component="a"
                href="mailto:support@zoskasnap.sk"
                sx={{
                  color: theme === "dark" ? "#64b5f6" : "#1565c0",
                  textDecoration: "underline",
                  "&:hover": { color: theme === "dark" ? "#42a5f5" : "#0d47a1" },
                }}
              >
                support@zoskasnap.sk
              </Box>.
            </Typography>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push("/podmienky")}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Podmienky používania
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
