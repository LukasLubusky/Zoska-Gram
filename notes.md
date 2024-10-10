<<<<<<< HEAD
npx create-next-app@latest   --> i
    nstall command
ls   --> 
    terminal – show root, vypis directiories
cd --> 
    change directory
cd .. --> 
    posunie nas o uroven vyzsie
npm run dev --> 
    zapinanie projektu
npm install @mui/material @emotion/react @emotion/styled --> 
    install mui libarry (html a css)
git init --> 
    inicializacia gitu
git branch -m <name> --> 
    zmeni meno git main brainchu
git config --global user.name "your name“ --> 
    nastavime user name
git config --global user.email "your email" --> 
    nastavime user email
git remote add origin https://github.com/your_username/project_name.git --> 
    nastavite svoj projekt
git add . --> 
    vlozite vsetky files z filu, ktory ste nastavili
git commit -m "Initial commit" --> 
    commit changes

- Node js vzdy zobrazuje stranku, ktora sa musi volat page.tsx a musi byt v app priecinku. Ako home stranku zobrazu tu, ktora je len v app priecinku a nie je zabalena nejakym inym priecinkom. Preto na home priecinok dame () --> (home) lebo router home priecinok „nevidi“ ak je v zatvrokach a page vnom zonbere ako default.

Next.js rezervovane nazvy --> layout.tsx, not-found.tsx, page.tsx

-routing --> 
npm run build --> skompiluje a vytvori production server na localhoste, vzdy zapnut pred commit/sync aby sa errors nedostali na production server

- vypise vsetky folders a files okrem .next, node_modules, .git -->
    ind . -path './.next' -prune -o -path './node_modules' -prune -o -path './.git' -prune -o -print | sed -e "s/[^\/]*// |/g" -e "s/|([^ ])/|-\1/"

=======
npx create-next-app@latest
# Inštalácia NextJS cez terminál (npx = node package execute)

ls
# linux, vypíše obsah dir (list)

cd
# linux, presmeruje do dir (change directory)

cd ..
# o úroveň vyššie

npm run dev
# spustí kód cez terminál

git init
# inicializovanie git v projekte

git branch -m main
# spraví main branch na githube

git config –global user.name/user.email

git remote add origin url
# prepojí git s githubom

git remote -v
# skontroluje prepojenie



NextJS – files stránkok sa musia volať page.tsx, ak nie je v app dir, tak musí byť v dir, ktorý ma meno v ()
globals.css musí existovať


not-found.tsx musí byť v app dir, overridene defaultnu page 404


find . -path './.next' -prune -o -path './node_modules' -prune -o -path './.git' -prune -o -print | sed -e "s/[^\/]*\// |/g" -e "s/|\([^ ]\)/|-\1/"

^vypise vsetky folders a files okrem .next, node_modules, .git
>>>>>>> 47ee7fa02edbbbaaba3d852fc65bdabe57973b00
