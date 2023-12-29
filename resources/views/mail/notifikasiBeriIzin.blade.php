<!doctype html>
<html>
<head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</head>
<body>
    <h1>Pengajuan <?= $user->respon?></h1>
    <p>Hello {{$user->first_name}}</p>
    <p><?= "Pengajuan anda telah di ".$user->respon." oleh ".$user->perespon?></p>
    <!-- <a href="<?= $user->link?>" class="button button-primary"><?= $user->link?></a> -->
    <a href="<?= $user->link?>" class="btn btn-primary">Klik Untuk Melihat</a>
</body>

</html>