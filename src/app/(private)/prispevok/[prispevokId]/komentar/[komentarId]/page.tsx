// src\app\prispevok\[prispevokId]\komentar\[komentarId]\page.tsx

import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

export const metadata = { title: 'Detail komentara | ZoskaGram'};

export default function CommentDetail({ 
  params,

}: {
  params: {
    prispevokId : string,
    komentarId : string
  };
}) {
  return (
    <Container>
      <Typography> Detail komentaru cislo: {params.komentarId} k prispevku {params.prispevokId}</Typography>
      <Typography> prispevok cislo: {params.prispevokId} a komentar k nemu cislo: {params.komentarId}</Typography>
    </Container>
  );
}