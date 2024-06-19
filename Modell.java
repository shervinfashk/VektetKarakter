import java.util.ArrayList;

public class Modell {

    public static int regnUtHøyestePoengMulig(ArrayList<VektetKarakter> tall, int sistePoengSum) {

        int totalVekting = 0;
        int totalSum = 0;

        for (VektetKarakter vk : tall) {
            totalVekting += vk.hentVekting();
            totalSum += vk.hentVektetSum();
        }

        VektetKarakter sistePoeng = new VektetKarakter(sistePoengSum, 100 - totalVekting);

        return totalSum + sistePoeng.hentVektetSum();

        // summerer opp totalt vekting
        // finner ut deres total sum så langt
        // gjenværende vekting * 100% returneres, høyest totalt mulig, legge til et
        // parameter til dette

        // må sjekke at total vektet prosent ikke utgjør mer enn eller er lik 100
        // prosent

        // returnere beste totalkarakter mulig basert på flere vektende karakter

        // hvert tall, er antall poeng av 100 oppnådd på en prøve.

    }

    public static void main(String[] args) {

        ArrayList<VektetKarakter> vk = new ArrayList<>();
        vk.add(new VektetKarakter(78, 25));

        System.out.println(Modell.regnUtHøyestePoengMulig(vk, 58));

    }

}
