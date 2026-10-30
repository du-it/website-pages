package de.duit;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Supplier;

/**
 * Demonstriert und vergleicht den Performance- und Speicherunterschied
 * zwischen einem klassischen Stream-Filter-Ansatz und einer In-Place-Filterung
 * mittels Two-Pointer-Pattern.
 */
public class InPlaceOptimizationDemo {

    /**
     * Hauptmethode zur Generierung der Testdaten und Steuerung des Benchmarks.
     *
     * @param args Kommandozeilenargumente (nicht verwendet)
     */
    public static void main(String[] args) {
        int elementCount = 10_000_000;
        System.out.println("Generiere " + elementCount + " Test-Datensätze...");

        List<UserAccount> accountsStreamTest = createTestAccounts(elementCount);
        // Exakte Kopie für identische Ausgangsbedingungen beim In-Place-Test
        List<UserAccount> accountsInPlaceTest = new ArrayList<>(accountsStreamTest);

        List<UserAccount> streamResult = measurePerformance(
                "Klassischer Stream-Filter-Ansatz",
                () -> cleanupDisabledAccounts(accountsStreamTest)
        );

        List<UserAccount> inPlaceResult = measurePerformance(
                "In-Place-Optimierung",
                () -> cleanupDisabledAccountsInPlace(accountsInPlaceTest)
        );

        System.out.println("Verifikation: Stream = " + streamResult.size() + " Konten, In-Place = " + inPlaceResult.size() + " Konten");
    }

    /**
     * Erzeugt eine Liste von Test-Accounts mit deterministisch verteiltem Status.
     *
     * @param count Anzahl der zu generierenden Test-Datensätze
     * @return Eine Liste mit initialisierten {@link UserAccount}-Objekten
     */
    private static List<UserAccount> createTestAccounts(int count) {
        List<UserAccount> accounts = new ArrayList<>(count);
        Random random = new Random(42);
        for (int i = 0; i < count; i++) {
            AccountStatus status = random.nextBoolean() ? AccountStatus.DISABLED : AccountStatus.ACTIVE;
            accounts.add(new UserAccount(status));
        }
        return accounts;
    }

    /**
     * Filtert deaktivierte Accounts über die Stream API.
     * <p>
     * Dieser Ansatz erzeugt eine neue Liste und benötigt somit O(N) zusätzlichen Speicher.
     * </p>
     *
     * @param accounts Die zu filternde Ursprungsliste
     * @return Eine neue Liste, die ausschließlich aktive {@link UserAccount}-Objekte enthält
     */
    private static List<UserAccount> cleanupDisabledAccounts(List<UserAccount> accounts) {
        return accounts.stream().filter(
                acc -> acc.status == AccountStatus.ACTIVE
        ).toList();
    }

    /**
     * Filtert deaktivierte Accounts in-place mithilfe des Two-Pointer-Patterns.
     * <p>
     * Modifiziert die übergebene Liste direkt und gibt eine SubList-View zurück.
     * Dadurch wird O(1) Zusatzspeicher eingehalten.
     * </p>
     *
     * @param accounts Die direkt zu modifizierende Liste von Accounts
     * @return Eine View ({@link List#subList}) der ursprünglichen Liste mit allen aktiven Accounts
     */
    static List<UserAccount> cleanupDisabledAccountsInPlace(List<UserAccount> accounts) {
        int writeIndex = 0;
        for (int readIndex = 0; readIndex < accounts.size(); readIndex++) {
            UserAccount account = accounts.get(readIndex);
            if (account.isActive()) {
                accounts.set(writeIndex, account);
                writeIndex++;
            }
        }
        return accounts.subList(0, writeIndex);
    }

    /**
     * Führt eine Aufgabe aus, misst die benötigte Laufzeit sowie den Heap-Speicherverbrauch
     * und gibt das Berechnungsergebnis zurück.
     *
     * @param <T>   Der Rückgabetyp der auszuführenden Aufgabe
     * @param label Die Beschriftung für die Konsolenausgabe
     * @param task  Die auszuführende Aufgabe als {@link Supplier}
     * @return Das von der Aufgabe berechnete Ergebnis
     */
    public static <T> T measurePerformance(String label, Supplier<T> task) {
        System.gc();
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        Runtime runtime = Runtime.getRuntime();
        long memBefore = runtime.totalMemory() - runtime.freeMemory();
        long start = System.currentTimeMillis();

        T result = task.get();

        long duration = System.currentTimeMillis() - start;
        long memAfter = runtime.totalMemory() - runtime.freeMemory();

        System.out.println(label + ":");
        System.out.println("  Laufzeit: " + duration + " ms");
        System.out.println("  Zusatzspeicher: " + String.format("%.1f", (memAfter - memBefore) / (1024.0 * 1024.0)) + " MB");

        return result;
    }

    /**
     * Repräsentiert ein Benutzerkonto mit einem Aktivitätsstatus.
     */
    static class UserAccount {
        AccountStatus status;

        /**
         * Erzeugt ein neues Benutzerkonto.
         *
         * @param status Der initiale Status des Kontos
         */
        UserAccount(AccountStatus status) {
            this.status = status;
        }

        /**
         * Prüft, ob das Konto aktiv ist.
         *
         * @return {@code true}, wenn der Status {@link AccountStatus#ACTIVE} entspricht, sonst {@code false}
         */
        public boolean isActive() {
            return status == AccountStatus.ACTIVE;
        }
    }

    /**
     * Mögliche Zustände eines Benutzerkontos.
     */
    enum AccountStatus {
        /** Aktiv geschaltetes Konto. */
        ACTIVE,
        /** Deaktiviertes Konto. */
        DISABLED
    }
}